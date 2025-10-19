package types

type UserSignUp struct {
	Username string `validate:"required"`
	Password string `validate:"required"`
	Email    string `validate:"required"`
}

type UserLogin struct {
	Email    string `validate:"required"`
	Password string `validate:"required"`
}

type Email struct {
	Email string `validate:"required"`
}

type Notes struct {
	Title   string `validate:"required"`
	NoteKey string `validate:"required"`
}

type NewEmailOldEmail struct {
	Email    string `validate:"required"`
	NewEmail string `validate:"required"`
}

type EmailUsername struct {
	Email    string `validate:"required"`
	Username string `validate:"required"`
}
