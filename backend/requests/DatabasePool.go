package requests

import (
	"github.com/jackc/pgx/v5/pgxpool"
)

// DatabasePool represents the pool of connections to the database
// In case of concurrency, this would allow the server to process multiple queries to the
// database efficiently
type DatabasePool struct {
	Db *pgxpool.Pool
}
