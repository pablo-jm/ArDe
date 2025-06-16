import { describe, it, expect } from "vitest"
import { validateEventData } from "./EventServices"

describe("validateEventData", () => {
  it("should return null if data is valid", () => {
    const result = validateEventData({
      title: "Evento válido",
      description: "Descripción válida para un evento",
      event_time: "14:30",
      event_date: "2025-06-30",
      place: "Sala de Conferencias",
    })

    expect(result).toBeNull()
  })

  // Original tests
  it("returns error if title is too short", () => {
    const result = validateEventData({
      title: "A",
      description: "Descripción válida para un evento",
      event_time: "14:30",
      event_date: "2025-06-30",
      place: "Lugar válido",
    })

    expect(result).toBe("El título debe tener entre 3 y 100 caracteres.")
  })

  it("returns error if time is invalid", () => {
    const result = validateEventData({
      title: "Título válido",
      description: "Descripción válida",
      event_time: "25:99",
      event_date: "2025-06-30",
      place: "Lugar válido",
    })

    expect(result).toBe("El formato de la hora no es válido.")
  })

  it("returns error if date is invalid", () => {
    const result = validateEventData({
      title: "Título válido",
      description: "Descripción válida",
      event_time: "14:30",
      event_date: "2025-13-01",
      place: "Lugar válido",
    })

    expect(result).toBe("El formato de la fecha no es válido.")
  })

  it("returns error if description is too short", () => {
    const result = validateEventData({
      title: "Título válido",
      description: "Corta",
      event_time: "14:30",
      event_date: "2025-06-30",
      place: "Lugar válido",
    })

    expect(result).toBe("La descripción debe tener entre 10 y 150 caracteres.")
  })

  it("returns error if place is too long", () => {
    const result = validateEventData({
      title: "Título válido",
      description: "Descripción válida",
      event_time: "14:30",
      event_date: "2025-06-30",
      place: "L".repeat(51),
    })

    expect(result).toBe("El nombre del lugar debe tener entre 3 y 50 caracteres.")
  })

  // New tests for title (3)
  it("returns error if title is too long", () => {
    const result = validateEventData({
      title: "T".repeat(101),
      description: "Descripción válida para un evento",
      event_time: "14:30",
      event_date: "2025-06-30",
      place: "Lugar válido",
    })

    expect(result).toBe("El título debe tener entre 3 y 100 caracteres.")
  })

  it("returns error if title is empty", () => {
    const result = validateEventData({
      title: "",
      description: "Descripción válida para un evento",
      event_time: "14:30",
      event_date: "2025-06-30",
      place: "Lugar válido",
    })

    expect(result).toBe("El título debe tener entre 3 y 100 caracteres.")
  })

  it("accepts title with exactly 3 characters", () => {
    const result = validateEventData({
      title: "ABC",
      description: "Descripción válida para un evento",
      event_time: "14:30",
      event_date: "2025-06-30",
      place: "Lugar válido",
    })

    expect(result).toBeNull()
  })

  // New tests for description (3)
  it("returns error if description is too long", () => {
    const result = validateEventData({
      title: "Título válido",
      description: "D".repeat(151),
      event_time: "14:30",
      event_date: "2025-06-30",
      place: "Lugar válido",
    })

    expect(result).toBe("La descripción debe tener entre 10 y 150 caracteres.")
  })

  it("returns error if description is empty", () => {
    const result = validateEventData({
      title: "Título válido",
      description: "",
      event_time: "14:30",
      event_date: "2025-06-30",
      place: "Lugar válido",
    })

    expect(result).toBe("La descripción debe tener entre 10 y 150 caracteres.")
  })

  it("accepts description with exactly 10 characters", () => {
    const result = validateEventData({
      title: "Título válido",
      description: "1234567890",
      event_time: "14:30",
      event_date: "2025-06-30",
      place: "Lugar válido",
    })

    expect(result).toBeNull()
  })

  // New tests for time (3)
  it("returns error if time is empty", () => {
    const result = validateEventData({
      title: "Título válido",
      description: "Descripción válida",
      event_time: "",
      event_date: "2025-06-30",
      place: "Lugar válido",
    })

    expect(result).toBe("El formato de la hora no es válido.")
  })

  it("accepts time 00:00", () => {
    const result = validateEventData({
      title: "Título válido",
      description: "Descripción válida",
      event_time: "00:00",
      event_date: "2025-06-30",
      place: "Lugar válido",
    })

    expect(result).toBeNull()
  })

  it("accepts time 23:59", () => {
    const result = validateEventData({
      title: "Título válido",
      description: "Descripción válida",
      event_time: "23:59",
      event_date: "2025-06-30",
      place: "Lugar válido",
    })

    expect(result).toBeNull()
  })

  // New tests for date (3)
  it("returns error if date is empty", () => {
    const result = validateEventData({
      title: "Título válido",
      description: "Descripción válida",
      event_time: "14:30",
      event_date: "",
      place: "Lugar válido",
    })

    expect(result).toBe("El formato de la fecha no es válido.")
  })

  it("returns error if date has incorrect format", () => {
    const result = validateEventData({
      title: "Título válido",
      description: "Descripción válida",
      event_time: "14:30",
      event_date: "25/06/2025",
      place: "Lugar válido",
    })

    expect(result).toBe("El formato de la fecha no es válido.")
  })

  it("returns error if day is invalid", () => {
    const result = validateEventData({
      title: "Título válido",
      description: "Descripción válida",
      event_time: "14:30",
      event_date: "2025-06-32",
      place: "Lugar válido",
    })

    expect(result).toBe("El formato de la fecha no es válido.")
  })

  // New tests for place (3)
  it("returns error if place is too short", () => {
    const result = validateEventData({
      title: "Título válido",
      description: "Descripción válida",
      event_time: "14:30",
      event_date: "2025-06-30",
      place: "AB",
    })

    expect(result).toBe("El nombre del lugar debe tener entre 3 y 50 caracteres.")
  })

  it("returns error if place is empty", () => {
    const result = validateEventData({
      title: "Título válido",
      description: "Descripción válida",
      event_time: "14:30",
      event_date: "2025-06-30",
      place: "",
    })

    expect(result).toBe("El nombre del lugar debe tener entre 3 y 50 caracteres.")
  })

  it("accepts place with exactly 3 characters", () => {
    const result = validateEventData({
      title: "Título válido",
      description: "Descripción válida",
      event_time: "14:30",
      event_date: "2025-06-30",
      place: "ABC",
    })

    expect(result).toBeNull()
  })
})
