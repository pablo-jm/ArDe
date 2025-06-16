import { describe, it, expect, vi, beforeEach } from "vitest"
import Swal from "sweetalert2"
import { showCreateWorkModal, handleWorkPreview, showUpdateWorkModal } from "./WorkServices"

vi.mock("sweetalert2", () => ({
  default: {
    fire: vi.fn(),
    close: vi.fn(),
    getPopup: vi.fn(),
    showValidationMessage: vi.fn(),
  },
}))

globalThis.fetch = vi.fn()
globalThis.localStorage = {
  getItem: vi.fn((key) => (key === "token" ? "fake-token" : key === "user" ? JSON.stringify({ id: 1 }) : null)),
}

Object.defineProperty(window, "location", {
  value: {
    reload: vi.fn(),
  },
})

describe("WorkServices", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe("showCreateWorkModal", () => {

    it("Displays create work modal", async () => {
      await showCreateWorkModal()
      expect(Swal.fire).toHaveBeenCalled()
    })


    it("Send valid data and calls fetch", async () => {
      const mockInputs = {
        "#title": { value: "Obra de prueba" },
        "#description": { value: "Una descripción válida" },
        "#image_url": { value: "https://img.test.com/obra.jpg" },
        "#price": { value: "150" },
        "#dimensions": { value: "50x70 cm" },
      }

      Swal.getPopup.mockReturnValue({
        querySelector: (id) => mockInputs[id],
      })

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ work: { title: "Obra de prueba" } }),
      })

      await showCreateWorkModal()
      const config = Swal.fire.mock.calls[0][0]
      await config.preConfirm()

      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:3000/works",
        expect.objectContaining({
          method: "POST",
          headers: expect.any(Object),
          body: expect.stringContaining("Obra de prueba"),
        }),
      )
    })


    it("Displays error if the data is not valid", async () => {
      Swal.getPopup.mockReturnValue({
        querySelector: () => ({ value: "" }),
      })

      await showCreateWorkModal()
      const config = Swal.fire.mock.calls[0][0]
      await config.preConfirm()

      expect(Swal.showValidationMessage).toHaveBeenCalled()
      expect(fetch).not.toHaveBeenCalled()
    })
  })



  describe("showUpdateWorkModal", () => {

    it("calls fetch to get works with correct authorization", async () => {
      const mockWorks = [
        {
          title: "Obra 1",
          description: "Descripción 1",
          image_url: "https://example.com/img1.jpg",
          price: 100,
          dimensions: "50x70 cm",
          state: "selling",
        },
      ]

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockWorks,
      })

      await showUpdateWorkModal()

      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:3000/works",
        expect.objectContaining({
          headers: {
            Authorization: "Bearer fake-token",
          },
        }),
      )
    })


    it("displays modal with correct title when works are available", async () => {
      const mockWorks = [
        {
          title: "Obra Test",
          description: "Descripción test",
          image_url: "https://example.com/test.jpg",
          price: 150,
          dimensions: "60x80 cm",
          state: "selling",
        },
      ]

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockWorks,
      })

      await showUpdateWorkModal()

      expect(Swal.fire).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Editar obra",
          html: expect.stringContaining("work-select"),
        }),
      )
    })


    it("shows info message when no works are available", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      })

      await showUpdateWorkModal()

      expect(Swal.fire).toHaveBeenCalledWith("No hay obras para editar.", "", "info")
    })


    it("shows info message when works is not an array", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => null,
      })

      await showUpdateWorkModal()

      expect(Swal.fire).toHaveBeenCalledWith("No hay obras para editar.", "", "info")
    })


    it("calls preConfirm and validates data correctly", async () => {
      const mockWorks = [
        {
          title: "Obra Test",
          description: "Descripción original",
          image_url: "https://example.com/original.jpg",
          price: 100,
          dimensions: "50x70 cm",
          state: "selling",
        },
      ]

      const mockInputs = {
        "#description": { value: "Nueva descripción válida para la obra" },
        "#image_url": { value: "https://example.com/nueva.jpg" },
        "#price": { value: "200" },
        "#dimensions": { value: "60x80 cm" },
        "#state": { value: "sold" },
        "#work-select": { addEventListener: vi.fn() },
      }

      fetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockWorks,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ message: "Obra actualizada correctamente" }),
        })

      Swal.getPopup.mockReturnValue({
        querySelector: (selector) => mockInputs[selector] || { addEventListener: vi.fn() },
      })

      vi.doMock("./WorkServices", async () => {
        const actual = await vi.importActual("./WorkServices")
        return {
          ...actual,
          validateWorkData: vi.fn(() => null),
        }
      })

      await showUpdateWorkModal()

      const swalConfig = Swal.fire.mock.calls[0][0]
      await swalConfig.preConfirm()

      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:3000/works/Obra%20Test",
        expect.objectContaining({
          method: "PUT",
          headers: expect.objectContaining({
            "Content-Type": "application/json",
            Authorization: "Bearer fake-token",
          }),
          body: expect.stringContaining("Nueva descripción válida para la obra"),
        }),
      )
    })


    it("Shows validation error when data is invalid", async () => {
      const mockWorks = [
        {
          title: "Obra Test",
          description: "Descripción",
          image_url: "https://example.com/test.jpg",
          price: 100,
          dimensions: "50x70 cm",
          state: "selling",
        },
      ]

      const mockInputs = {
        "#description": { value: "" },
        "#image_url": { value: "" },
        "#price": { value: "" },
        "#dimensions": { value: "" },
        "#state": { value: "selling" },
        "#work-select": { addEventListener: vi.fn() },
      }

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockWorks,
      })

      Swal.getPopup.mockReturnValue({
        querySelector: (selector) => mockInputs[selector] || { addEventListener: vi.fn() },
      })

      await showUpdateWorkModal()

      const swalConfig = Swal.fire.mock.calls[0][0]
      await swalConfig.preConfirm()

      expect(Swal.showValidationMessage).toHaveBeenCalled()
    })

    it("Handles server error during update", async () => {
      const mockWorks = [
        {
          title: "Obra Test",
          description: "Descripción",
          image_url: "https://example.com/test.jpg",
          price: 100,
          dimensions: "50x70 cm",
          state: "selling",
        },
      ]

      const mockInputs = {
        "#description": { value: "Descripción válida para la obra" },
        "#image_url": { value: "https://example.com/valid.jpg" },
        "#price": { value: "150" },
        "#dimensions": { value: "50x70 cm" },
        "#state": { value: "selling" },
        "#work-select": { addEventListener: vi.fn() },
      }

      fetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockWorks,
        })
        .mockResolvedValueOnce({
          ok: false,
          json: async () => ({ message: "Error del servidor" }),
        })

      Swal.getPopup.mockReturnValue({
        querySelector: (selector) => mockInputs[selector] || { addEventListener: vi.fn() },
      })

      await showUpdateWorkModal()

      const swalConfig = Swal.fire.mock.calls[0][0]
      await swalConfig.preConfirm()

      expect(Swal.showValidationMessage).toHaveBeenCalledWith("Error del servidor")
    })

    it("Handles network error during update", async () => {
      const mockWorks = [
        {
          title: "Obra Test",
          description: "Descripción",
          image_url: "https://example.com/test.jpg",
          price: 100,
          dimensions: "50x70 cm",
          state: "selling",
        },
      ]

      const mockInputs = {
        "#description": { value: "Descripción válida para la obra" },
        "#image_url": { value: "https://example.com/valid.jpg" },
        "#price": { value: "150" },
        "#dimensions": { value: "50x70 cm" },
        "#state": { value: "selling" },
        "#work-select": { addEventListener: vi.fn() },
      }

      fetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockWorks,
        })
        .mockRejectedValueOnce(new Error("Network error"))

      Swal.getPopup.mockReturnValue({
        querySelector: (selector) => mockInputs[selector] || { addEventListener: vi.fn() },
      })

      await showUpdateWorkModal()

      const swalConfig = Swal.fire.mock.calls[0][0]
      await swalConfig.preConfirm()

      expect(Swal.showValidationMessage).toHaveBeenCalledWith("Network error")
    })
  })

  describe("handleWorkPreview", () => {
    it("Displays work preview modal", async () => {
      const work = {
        id: 10,
        title: "Obra X",
        image_url: "https://img.test.com/img.jpg",
        description: "Arte digital",
        price: 120,
      }

      await handleWorkPreview(work)

      expect(Swal.fire).toHaveBeenCalledWith({
        html:
          expect.stringContaining("Arte digital") &&
          expect.stringContaining("Obra X") &&
          expect.stringContaining("https://img.test.com/img.jpg"),
        customClass: {
          popup: "swal-popup-custom",
        },
        showConfirmButton: false,
        didOpen: expect.any(Function),
      })
    })

    it("Handles add button click and creates order", async () => {
      const work = {
        id: 10,
        title: "Obra X",
        image_url: "https://img.test.com/img.jpg",
        description: "Arte digital",
        price: 120,
      }

      const mockButton = {
        addEventListener: vi.fn(),
      }

      Swal.getPopup.mockReturnValue({
        querySelector: vi.fn().mockReturnValue(mockButton),
      })

      await handleWorkPreview(work)

      const config = Swal.fire.mock.calls[0][0]
      config.didOpen()

      expect(Swal.getPopup().querySelector).toHaveBeenCalledWith("#btn-add")
      expect(mockButton.addEventListener).toHaveBeenCalledWith("click", expect.any(Function))
    })
  })
})
