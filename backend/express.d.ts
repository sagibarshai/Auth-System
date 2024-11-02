declare global {
  namespace Express {
    interface Request {
      currentUser?: SafeUser; // or the appropriate type for your current user
    }
  }
}
