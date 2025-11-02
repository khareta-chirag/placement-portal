import jwt from "jsonwebtoken";

// ✅ Basic auth middleware
export const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

// ✅ Role-specific middlewares
export const isCompany = (req, res, next) => {
  if (req.user.role !== "company") {
    return res.status(403).json({ message: "Only company access" });
  }
  next();
};

export const isStudent = (req, res, next) => {
  if (req.user.role !== "student") {
    return res.status(403).json({ message: "Only student access" });
  }
  next();
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Only admin access" });
  }
  next();
};

// ✅ "protect" = same as "auth" for backward compatibility
export const protect = auth;

// ✅ "authorize" middleware (role-based)
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

// ✅ Default export
export default auth;
