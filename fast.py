from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

db = []
class Paste(BaseModel):
    content: str


@app.get('/')
def root():
    return {'message': 'Hello World'}


@app.get('/paste/{paste_id}')
def get_paste(paste_id: int):
    if paste_id < len(db):
        return {'paste_id': paste_id,
                'paste': db[paste_id]}
    else:
        return {'paste_id': paste_id,
                'paste': None}


@app.post('/paste/')
def post_paste(paste: Paste):
    db.append(paste)
    paste_id = len(db)-1
    return {'paste_id': paste_id,
            'paste': db[paste_id]}


@app.put('/paste/{paste_id}')
def put_paste(paste_id: int, paste: Paste):
    if paste_id < len(db):
        db[paste_id] = paste
        return {'paste_id': paste_id, 
                'paste': paste}
    else:
        return {'paste_id': paste_id,
                'paste': None}
                
                
@app.delete('/paste/{paste_id}')
def delete_paste(paste_id:int):
    if paste_id < len(db):
        db[paste_id] = None
        return {'paste_id': paste_id,
                'paste': db[paste_id]}
    else:
        return {'paste_id': paste_id,
                'paste': None}