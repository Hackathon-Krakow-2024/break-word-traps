from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from routes.transcription import get_transcript_and_subtitles
from routes.analyze_text import analyze_text

app = FastAPI()

# Using DB
# from tinydb import TinyDB
# from pydantic import BaseModel

# db = TinyDB('db.json')
# todosTable = db.table('todos')

# class TodoModel(BaseModel):
#     title: str
#     content: str

# # Get all todos
# @app.get("/todos")
# async def get_all_todos():
#     todos_with_ids = [{"id": todo.doc_id, **todo} for todo in todosTable.all()]
#     return {"message": "OK", "data": todos_with_ids}

# # Get todo by id
# @app.get("/todos/{todo_id}")
# async def get_todo_by_id(todo_id: int):
#     todo = todosTable.get(doc_id=todo_id)
#     if not todo:
#         raise HTTPException(status_code=404, detail="Todo not found")
#     return {"message": "OK", "data": {**todo, "id": todo.doc_id}}

# # Add todo
# @app.post("/todos")
# async def create_todo(todo: TodoModel):
#     todoId = todosTable.insert(todo.model_dump())
#     return {"message": f"Todo with {todoId} has been succesfuly added.", "data": {**todo.model_dump(), "id": todoId}}

# # Delete todo
# @app.delete("/todos/{todo_id}")
# async def delete_todo(todo_id: int):
#     todo = todosTable.get(doc_id=todo_id)
#     if not todo:
#         raise HTTPException(status_code=404, detail="Todo not found")

#     todosTable.remove(doc_ids=[todo_id])

#     return {"message": f"Todo with ID {todo_id} has been successfully deleted.", "data": {**todo, "id": todo_id}}

# # Update todo
# @app.patch("/todos/{todo_id}")
# async def update_todo(todo_id: int, todo: TodoModel):
#     existing_todo = todosTable.get(doc_id=todo_id)

#     if not existing_todo:
#         raise HTTPException(status_code=404, detail="Todo not found")

#     todosTable.update({'title': todo.title, 'content': todo.content}, doc_ids=[todo_id])

#     return {
#         "message": f"Todo with ID {todo_id} has been successfully updated.",
#         "data": {**existing_todo, "title": todo.title, "content": todo.content, "id": todo_id}
#     }

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/transcription")
async def transcription(video_file: UploadFile = File(...)):
    return await get_transcript_and_subtitles(video_file)

@app.post("/analyze")
async def analyze(transcription: str):
    return await analyze_text(transcription)