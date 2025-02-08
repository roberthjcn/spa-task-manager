export const AppConstants = {
    MESSAGES: {
        USER_CREATED: 'Usuario creado correctamente',
        USER_CREATION_ERROR: 'Error al crear el usuario',
        LOGIN_SUCCESS: '¡Has iniciado sesión correctamente!',
        LOGIN_ERROR: '¡Error al iniciar sesión!',
        USER_NOT_FOUND: '¡Usuario no encontrado!',
        UNKNOWN_ERROR: '¡Error desconocido!',
        LOGIN_RETRY: '¡Error al iniciar sesión! Inténtalo nuevamente.',
        TASK_CREATED: '¡Tarea Agregada Correctamente!',
        TASK_UPDATED: '¡Tarea Actualizada Correctamente!',
        TASK_DELETION: '¡Tarea Eliminada Correctamente!',
        TASK_COMPLETE: '¡La Tarea a sido Completada!',
        TASK_PENDING: '¡La Tarea esta Pendiente!'
    },
    ROUTES: {
        TASKS: '/tasks',
        LOGIN: '/login',
    },
    STORAGE_KEYS: {
        USER: 'user',
    },
    STATUS_CODES: {
        SUCCESS: 200,
        NOT_FOUND: 404,
    },
};