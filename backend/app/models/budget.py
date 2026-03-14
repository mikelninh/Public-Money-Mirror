from sqlalchemy import Column, String, Integer, BigInteger, Text, ForeignKey
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import DeclarativeBase, relationship


class Base(DeclarativeBase):
    pass


class BudgetCategory(Base):
    __tablename__ = "budget_categories"

    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    icon = Column(String, nullable=False)
    color = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    sort_order = Column(Integer, nullable=False, default=0)

    items = relationship("BudgetItem", back_populates="category")


class BudgetItem(Base):
    __tablename__ = "budget_items"

    id = Column(Integer, primary_key=True, autoincrement=True)
    category_id = Column(String, ForeignKey("budget_categories.id"), nullable=False)
    year = Column(Integer, nullable=False)
    amount_cents = Column(BigInteger, nullable=False)
    examples = Column(JSONB, nullable=False, default=list)

    category = relationship("BudgetCategory", back_populates="items")
