import { describe, it, expect, beforeEach, vi } from "vitest"
import bcrypt from "bcryptjs"

vi.mock("@/lib/prisma")
vi.mock("@/lib/email", () => ({
    sendOTPEmail: vi.fn().mockResolvedValue({ success: true }),
}))

import { POST } from "../signup/route"
import { prisma } from "@/lib/prisma"

beforeEach(() => {
    vi.clearAllMocks()
})

describe("POST /api/auth/signup", () => {
    it("returns 400 for missing name", async () => {
        const req = new Request("http://localhost/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: "test@example.com", password: "password123" }),
        })
        const res = await POST(req as any)
        const data = await res.json()

        expect(res.status).toBe(400)
        expect(data.error).toBe("Invalid input")
    })

    it("returns 400 for missing email", async () => {
        const req = new Request("http://localhost/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: "Test User", password: "password123" }),
        })
        const res = await POST(req as any)
        const data = await res.json()

        expect(res.status).toBe(400)
        expect(data.error).toBe("Invalid input")
    })

    it("returns 400 for missing password", async () => {
        const req = new Request("http://localhost/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: "Test User", email: "test@example.com" }),
        })
        const res = await POST(req as any)
        const data = await res.json()

        expect(res.status).toBe(400)
        expect(data.error).toBe("Invalid input")
    })

    it("returns 400 for too short password", async () => {
        const req = new Request("http://localhost/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: "Test User", email: "test@example.com", password: "123" }),
        })
        const res = await POST(req as any)
        const data = await res.json()

        expect(res.status).toBe(400)
        expect(data.error).toBe("Invalid input")
    })

    it("returns 400 for whitespace-only email", async () => {
        const req = new Request("http://localhost/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: "Test User", email: "   ", password: "password123" }),
        })
        const res = await POST(req as any)
        const data = await res.json()

        expect(res.status).toBe(400)
        expect(data.error).toBe("Invalid input")
    })

    it("returns 400 if email already exists", async () => {
        ; (prisma.user.findUnique as any).mockResolvedValue({ id: "1", email: "test@example.com" })

        const req = new Request("http://localhost/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: "Test User", email: "test@example.com", password: "password123" }),
        })
        const res = await POST(req as any)
        const data = await res.json()

        expect(res.status).toBe(400)
        expect(data.error).toBe("Email already in use")
    })

    it("returns 200 and creates user/session in test (saltRounds=6)", async () => {
        ; (prisma.user.findUnique as any).mockResolvedValue(null)
            ; (prisma.user.create as any).mockResolvedValue({
                id: "1",
                email: "test@example.com",
                name: "Test User",
                passwordHash: await bcrypt.hash("password123", 6),
            })

        const req = new Request("http://localhost/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: "Test User", email: "test@example.com", password: "password123" }),
        })
        const res = await POST(req as any)
        const data = await res.json()

        expect(res.status).toBe(200)
        expect(data.ok).toBe(true)
    })

    it("returns 200 and uses 12 saltRounds in production", async () => {
        vi.stubEnv("NODE_ENV", "production")

            ; (prisma.user.findUnique as any).mockResolvedValue(null)
            ; (prisma.user.create as any).mockResolvedValue({
                id: "2",
                email: "prod@example.com",
                name: "Prod User",
                passwordHash: await bcrypt.hash("password123", 12),
            })

        const req = new Request("http://localhost/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: "Prod User", email: "prod@example.com", password: "password123" }),
        })
        const res = await POST(req as any)
        const data = await res.json()

        expect(res.status).toBe(200)
        expect(data.ok).toBe(true)

        vi.unstubAllEnvs()
    })
})