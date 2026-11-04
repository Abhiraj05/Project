import asyncio
from langgraph.graph import StateGraph, START, END
from langgraph.checkpoint.memory import MemorySaver
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import AIMessage
from langchain_core.runnables import RunnableConfig
from langgraph.types import interrupt
from langgraph.prebuilt import ToolNode
from langchain_core.messages import HumanMessage, AIMessage
from agent.agent_client import llm, tools, llm_with_tools


async def main():
    tool_node = ToolNode(tools)

    messages = [
        HumanMessage(
            content="Find hotels in Goa for December 15 to December 18, 2026"
        )
    ]

    response = await llm_with_tools.ainvoke(messages)
    messages.append(AIMessage(content=response))

    if response.tool_calls:
        result = tool_node.ainvoke({"messages": messages})
        messages.extend(result["messages"])
        final_response = await llm.ainvoke(messages)
        print(final_response.content)


if __name__ == '__main__':
    asyncio.run(main())
