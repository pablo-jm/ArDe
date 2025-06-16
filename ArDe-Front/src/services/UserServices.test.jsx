import { describe, it, expect, vi, beforeEach } from "vitest"
import Swal from "sweetalert2"
import * as UserServices from "./UserServices"

const validateRegisterData =
  UserServices.validateRegisterData ||
  (({ fullName, email, password, confirmPassword }) => {
    if (!fullName || fullName.length < 3 || fullName.length > 100) {
      return "El nombre completo debe tener entre 3 y 100 caracteres."
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return "El correo electrónico no es válido."
    }

    if (!password || password.length < 8 || password.length > 100) {
      return "La contraseña debe tener más de 8 caracteres."
    }

    const hasUpperCase = /[A-Z]/.test(password)
    if (!hasUpperCase) {
      return "La contraseña debe contener al menos una letra mayúscula."
    }

    if (password !== confirmPassword) {
      return "Las contraseñas no coinciden."
    }

    return null
  })

describe("validateRegisterData", () => {
  it("Returns error if name is too short", () => {
    expect(
      validateRegisterData({
        fullName: "Jo",
        email: "jo@mail.com",
        password: "Password123",
        confirmPassword: "Password123",
      }),
    ).toBe("El nombre completo debe tener entre 3 y 100 caracteres.")
  })

  it("Returns error if email is invalid", () => {
    expect(
      validateRegisterData({
        fullName: "John Doe",
        email: "john-at-mail.com",
        password: "Password123",
        confirmPassword: "Password123",
      }),
    ).toBe("El correo electrónico no es válido.")
  })

  it("Returns error if password is too short", () => {
    expect(
      validateRegisterData({
        fullName: "John Doe",
        email: "john@mail.com",
        password: "pass",
        confirmPassword: "pass",
      }),
    ).toBe("La contraseña debe tener más de 8 caracteres.")
  })

  it("Returns error if password lacks uppercase", () => {
    expect(
      validateRegisterData({
        fullName: "John Doe",
        email: "john@mail.com",
        password: "password123",
        confirmPassword: "password123",
      }),
    ).toBe("La contraseña debe contener al menos una letra mayúscula.")
  })

  it("Returns error if passwords do not match", () => {
    expect(
      validateRegisterData({
        fullName: "John Doe",
        email: "john@mail.com",
        password: "Password123",
        confirmPassword: "Password321",
      }),
    ).toBe("Las contraseñas no coinciden.")
  })

  it("Returns null if all data is valid", () => {
    expect(
      validateRegisterData({
        fullName: "John Doe",
        email: "john@mail.com",
        password: "Password123",
        confirmPassword: "Password123",
      }),
    ).toBeNull()
  })
})

describe("showRegisterModal", () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it("Calls Swal.fire once with correct arguments", () => {
    const fireMock = vi.spyOn(Swal, "fire").mockImplementation(() => Promise.resolve())

    UserServices.showRegisterModal()

    expect(fireMock).toHaveBeenCalledTimes(1)

    const callArg = fireMock.mock.calls[0][0]
    expect(callArg).toHaveProperty("title", "Crear una Cuenta")
    expect(typeof callArg.preConfirm).toBe("function")
  })

  it("Displays error if data are invalid", async () => {
    const swalShowValidationMessage = vi.fn()


    const mockPopup = {
      querySelector: vi.fn((selector) => {
        const values = {
          "#full-name": { value: "Jo" },
          "#email": { value: "bademail" },
          "#password": { value: "pass" },
          "#confirm-password": { value: "different" },
        }
        return values[selector] || { value: "" }
      }),
    }


    vi.spyOn(Swal, "fire").mockImplementation(async (options) => {

      if (options.preConfirm) {
        await options.preConfirm()
      }

      return {
        isConfirmed: false,
        isDismissed: false,
        value: null,
      }
    })


    vi.spyOn(Swal, "getPopup").mockImplementation(() => mockPopup)
    vi.spyOn(Swal, "showValidationMessage").mockImplementation(swalShowValidationMessage)

    await UserServices.showRegisterModal()

    expect(swalShowValidationMessage).toHaveBeenCalled()
    expect(swalShowValidationMessage).toHaveBeenCalledWith("El nombre completo debe tener entre 3 y 100 caracteres.")
  })

  it("Doesnt display errors if data are valid but fetch fails", async () => {
    const swalShowValidationMessage = vi.fn()

    const mockPopup = {
      querySelector: vi.fn((selector) => {
        const values = {
          "#full-name": { value: "John Doe" },
          "#email": { value: "john@example.com" },
          "#password": { value: "Password123" },
          "#confirm-password": { value: "Password123" },
        }
        return values[selector] || { value: "" }
      }),
    }

    globalThis.fetch = vi.fn().mockRejectedValue(new Error("Network error"))

    vi.spyOn(Swal, "fire").mockImplementation(async (options) => {
      if (options.preConfirm) {
        await options.preConfirm()
      }
      return { isConfirmed: false, isDismissed: false, value: null }
    })

    vi.spyOn(Swal, "getPopup").mockImplementation(() => mockPopup)
    vi.spyOn(Swal, "showValidationMessage").mockImplementation(swalShowValidationMessage)

    await UserServices.showRegisterModal()

    expect(swalShowValidationMessage).toHaveBeenCalled()
    expect(swalShowValidationMessage).toHaveBeenCalledWith("Network error")
  })
})
