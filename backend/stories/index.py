"""
Управление заявками на публикацию сказок: отправка и модерация.
"""
import json
import os
import psycopg2


SCHEMA = os.environ['MAIN_DB_SCHEMA']

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token',
}


def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])


def handler(event: dict, context) -> dict:
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    method = event.get('httpMethod', 'GET')
    path_params = event.get('queryStringParameters') or {}

    # POST /  — отправить заявку
    if method == 'POST':
        body = json.loads(event.get('body') or '{}')
        required = ['title', 'author_name', 'author_email', 'category', 'age_range', 'read_time', 'story_text', 'emoji']
        for field in required:
            if not body.get(field, '').strip():
                return {'statusCode': 400, 'headers': CORS, 'body': json.dumps({'error': f'Поле {field} обязательно'})}

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"""INSERT INTO {SCHEMA}.story_submissions
                (title, author_name, author_email, category, age_range, read_time, story_text, emoji)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s) RETURNING id""",
            (body['title'], body['author_name'], body['author_email'],
             body['category'], body['age_range'], body['read_time'],
             body['story_text'], body['emoji'])
        )
        submission_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()
        return {'statusCode': 201, 'headers': CORS, 'body': json.dumps({'id': submission_id, 'message': 'Заявка отправлена на модерацию'})}

    # GET /?admin=1  — список заявок для администратора
    if method == 'GET' and path_params.get('admin') == '1':
        admin_token = (event.get('headers') or {}).get('X-Admin-Token', '')
        if admin_token != os.environ.get('ADMIN_PASSWORD', ''):
            return {'statusCode': 403, 'headers': CORS, 'body': json.dumps({'error': 'Неверный пароль'})}

        status_filter = path_params.get('status', 'pending')
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"""SELECT id, title, author_name, author_email, category, age_range,
                       read_time, story_text, emoji, status, admin_comment, created_at, reviewed_at
                FROM {SCHEMA}.story_submissions
                WHERE status = %s ORDER BY created_at DESC""",
            (status_filter,)
        )
        rows = cur.fetchall()
        cur.close()
        conn.close()
        submissions = [
            {
                'id': r[0], 'title': r[1], 'author_name': r[2], 'author_email': r[3],
                'category': r[4], 'age_range': r[5], 'read_time': r[6],
                'story_text': r[7], 'emoji': r[8], 'status': r[9],
                'admin_comment': r[10],
                'created_at': r[11].isoformat() if r[11] else None,
                'reviewed_at': r[12].isoformat() if r[12] else None,
            }
            for r in rows
        ]
        return {'statusCode': 200, 'headers': CORS, 'body': json.dumps(submissions, ensure_ascii=False)}

    # PUT /?id=X  — одобрить или отклонить
    if method == 'PUT':
        admin_token = (event.get('headers') or {}).get('X-Admin-Token', '')
        if admin_token != os.environ.get('ADMIN_PASSWORD', ''):
            return {'statusCode': 403, 'headers': CORS, 'body': json.dumps({'error': 'Неверный пароль'})}

        submission_id = path_params.get('id')
        if not submission_id:
            return {'statusCode': 400, 'headers': CORS, 'body': json.dumps({'error': 'Не указан id'})}

        body = json.loads(event.get('body') or '{}')
        new_status = body.get('status')
        if new_status not in ('approved', 'rejected'):
            return {'statusCode': 400, 'headers': CORS, 'body': json.dumps({'error': 'status должен быть approved или rejected'})}

        admin_comment = body.get('admin_comment', '')
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"""UPDATE {SCHEMA}.story_submissions
                SET status = %s, admin_comment = %s, reviewed_at = NOW()
                WHERE id = %s""",
            (new_status, admin_comment, submission_id)
        )
        conn.commit()
        cur.close()
        conn.close()
        return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'message': 'Статус обновлён'})}

    return {'statusCode': 405, 'headers': CORS, 'body': json.dumps({'error': 'Method not allowed'})}
