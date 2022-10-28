export interface User {
  body: {
    _id: string
    name: string
    username: string
    email: string
    puntos: number
    imagen: string
  }
}

export interface Equipo {
  body: {
    nombre: string
    imagen: string
  }
}

export interface Partido {
  body: {
    _id: number
    equipoLocal: Equipo['body']
    equipoVisita: Equipo['body']
    golesLocal: number
    golesVisita: number
    status: boolean
  }
}

export interface Pronostico {
  body: {
    idUser: number
    idPartido: number
    user: User['body']
    partido: Partido['body']
    golesLocal: number
    golesVisita: number
  }
}