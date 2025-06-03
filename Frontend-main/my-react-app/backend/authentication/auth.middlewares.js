import jwt from "jsonwebtoken";
import { db } from "../libs/db.js";

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - no token provided"
            })
        }

        let decodedToken;
        try {
            decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - invalid token"
            })   
        }
        
        const user = await db.user.findUnique({
            where: {
                id: decodedToken.id
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                image: true
            }
        });

        if(!user) {
            return res.status(404).json({
                success: false,
                message: "Unauthorized - user not found"
            })
        }

        req.user = user;
        next();

    } catch (error) {
        console.error("Error in auth middleware", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })        
    }


}


export const checkAdmin = async (req, res, next) => {

    try {
        const userId = req.user.id;
        const user = await db.user.findUnique({
            where: {
                id: userId
            },
            select: {
                role: true
            }
        })

        if(!user || user.role !== "ADMIN") {
            return res.status(403).json({
                success: false,
                message: "Forbidden - you are not an admin"
            })
        }

        next();
    } catch (error) {
        console.error("Error in checkAdmin middleware", error);
        return res.status(500).json({
            success: false,
            message: "Access denied - Admin only"
        })        
    }

}
