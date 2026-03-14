.PHONY: up down seed logs

up:
	docker compose up -d

down:
	docker compose down

seed:
	docker compose exec backend python -m etl.seed_data

logs:
	docker compose logs -f backend

db-shell:
	docker compose exec postgres psql -U pmm -d pmm
