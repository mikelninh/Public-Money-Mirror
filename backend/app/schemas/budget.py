from pydantic import BaseModel


class BudgetCategoryResponse(BaseModel):
    id: str
    name: str
    percentage: int
    amount: str
    description: str
    examples: list[str]
    color: str
    icon: str

    model_config = {"from_attributes": True}
