import asyncio
from langgraph.graph import StateGraph, START, END
from langgraph.checkpoint.memory import MemorySaver
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import AIMessage
from langchain_core.runnables import RunnableConfig
from langgraph.types import interrupt
from agent import client


llm_model = ChatGoogleGenerativeAI()


async def build_graph():
    tools = await client.get_tools()
    llm_model_with_tools = llm_model.bind_tools(tools)
    

async def main():
    chatbot = await build_graph()
    
if __name__=='__main__':
    asyncio.run(main())