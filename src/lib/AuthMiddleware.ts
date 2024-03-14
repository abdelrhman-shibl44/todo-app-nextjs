// import { getSession } from "next-auth/react";

// export async function authMiddleware(req: any, res: any, next: any) {
//   try {
//     const session = await getSession({ req });

//     if (!session) {
//       // User is not authenticated
//       return res.status(401).json({ error: "Unauthorized" });
//     }

//     // User is authenticated, proceed to the next middleware or route handler
//     return next();
//   } catch (error) {
//     console.error("Error in authMiddleware:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// }
