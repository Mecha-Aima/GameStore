from sqlalchemy import create_engine
from dotenv import load_dotenv
import os

load_dotenv()

server = os.getenv('SERVER')
database = os.getenv('DATABASE')
username = os.getenv('USERNAME')
password = os.getenv('PASSWORD')
driver = os.getenv('DRIVER')

connection_string = (
    f"mssql+pyodbc://{username}:{password}@{server}/{database}"
    f"?driver={driver}&Encrypt=Yes&TrustServerCertificate=Yes"
)

engine = create_engine(connection_string, fast_executemany=True)