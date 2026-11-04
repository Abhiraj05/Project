
"""added few models and changes on existing ones

Revision ID: 287f53339110
Revises: 55fd980504a2
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


revision: str = "287f53339110"
down_revision: Union[str, Sequence[str], None] = "55fd980504a2"
branch_labels = None
depends_on = None


def upgrade() -> None:

    # 1. Create suggested_trips
    op.create_table(
        "suggested_trips",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("destination_name", sa.String(30), nullable=False),
        sa.Column("country", sa.String(30), nullable=False),
        sa.Column("continent", sa.String(30), nullable=True),
        sa.Column("travel_interests", sa.String(20), nullable=True),
        sa.Column("ideal_duration", sa.String(15), nullable=False),
        sa.Column("best_visiting_time", sa.String(20), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )

    # 2. Preserve old trips table and rename it
    # Remove the old FK before changing the referenced table name.
    op.drop_constraint(
        "trip_history_trip_id_fkey",
        "trip_history",
        type_="foreignkey",
    )

    op.rename_table("trips", "custom_trip_plan")

    # Rename destination_name to destination
    op.alter_column(
        "custom_trip_plan",
        "destination_name",
        new_column_name="destination",
        existing_type=sa.String(),
        existing_nullable=False,
    )

    # Remove columns no longer present in the new model
    op.drop_column("custom_trip_plan", "country")
    op.drop_column("custom_trip_plan", "continent")
    op.drop_column("custom_trip_plan", "best_visiting_time")

    # Recreate FK to the renamed table
    op.create_foreign_key(
        "trip_history_trip_id_fkey",
        "trip_history",
        "custom_trip_plan",
        ["trip_id"],
        ["id"],
        ondelete="CASCADE",
    )

    # 3. Create preference_recommendation
    op.create_table(
        "preference_recommendation",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("preferences", sa.JSON(), nullable=False),
        sa.Column(
            "status",
            sa.String(20),
            nullable=False,
        ),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.ForeignKeyConstraint(
            ["user_id"],
            ["users.id"],
            ondelete="CASCADE",
        ),
        sa.PrimaryKeyConstraint("id"),
    )

    op.create_index(
        "ix_preference_recommendation_id",
        "preference_recommendation",
        ["id"],
        unique=False,
    )

    op.create_index(
        "ix_preference_recommendation_user_id",
        "preference_recommendation",
        ["user_id"],
        unique=False,
    )

    # 4. Update user_preferences
    op.add_column(
        "user_preferences",
        sa.Column(
            "created_at",
            sa.DateTime(),
            server_default=sa.text("now()"),
            nullable=False,
        ),
    )

    op.alter_column(
        "user_preferences",
        "budget_preference",
        existing_type=sa.VARCHAR(30),
        nullable=True,
    )

    op.alter_column(
        "user_preferences",
        "travel_company",
        existing_type=sa.VARCHAR(20),
        nullable=True,
    )

    op.alter_column(
        "user_preferences",
        "trip_duration",
        existing_type=sa.VARCHAR(),
        nullable=True,
    )

    op.alter_column(
        "user_preferences",
        "destination_preference",
        existing_type=sa.VARCHAR(),
        nullable=True,
    )

    # 5. Update user_profile
    # Assumes travel_style replaces travel_interests.
    op.alter_column(
        "user_profile",
        "travel_interests",
        new_column_name="travel_style",
        existing_type=sa.VARCHAR(20),
        existing_nullable=False,
    )


def downgrade() -> None:

    # 1. Restore user_profile column name
    op.alter_column(
        "user_profile",
        "travel_style",
        new_column_name="travel_interests",
        existing_type=sa.VARCHAR(20),
        existing_nullable=False,
    )

    # 2. Restore user_preferences
    op.drop_column("user_preferences", "created_at")

    op.alter_column(
        "user_preferences",
        "budget_preference",
        existing_type=sa.VARCHAR(30),
        nullable=False,
    )

    op.alter_column(
        "user_preferences",
        "travel_company",
        existing_type=sa.VARCHAR(20),
        nullable=False,
    )

    op.alter_column(
        "user_preferences",
        "trip_duration",
        existing_type=sa.VARCHAR(),
        nullable=False,
    )

    op.alter_column(
        "user_preferences",
        "destination_preference",
        existing_type=sa.VARCHAR(),
        nullable=False,
    )

    # 3. Remove preference_recommendation
    op.drop_index(
        "ix_preference_recommendation_user_id",
        table_name="preference_recommendation",
    )

    op.drop_index(
        "ix_preference_recommendation_id",
        table_name="preference_recommendation",
    )

    op.drop_table("preference_recommendation")

    # 4. Restore old trip_history FK
    op.drop_constraint(
        "trip_history_trip_id_fkey",
        "trip_history",
        type_="foreignkey",
    )

    # Restore removed columns before renaming the table
    op.add_column(
        "custom_trip_plan",
        sa.Column("country", sa.String(30), nullable=True),
    )

    op.add_column(
        "custom_trip_plan",
        sa.Column("continent", sa.String(30), nullable=True),
    )

    op.add_column(
        "custom_trip_plan",
        sa.Column("best_visiting_time", sa.String(20), nullable=True),
    )

    op.alter_column(
        "custom_trip_plan",
        "destination",
        new_column_name="destination_name",
        existing_type=sa.String(),
        existing_nullable=False,
    )

    op.rename_table("custom_trip_plan", "trips")

    op.create_foreign_key(
        "trip_history_trip_id_fkey",
        "trip_history",
        "trips",
        ["trip_id"],
        ["id"],
        ondelete="CASCADE",
    )

    # 5. Remove suggested_trips
    op.drop_table("suggested_trips")
