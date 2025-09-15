export const BASE_URL = "https://expenso-en1y.onrender.com";
// export const BASE_URL = "http://localhost:8000";


export const API_PATHS = {
    AUTH: {
        LOGIN: "/api/v1/auth/login",
        REGISTER: "/api/v1/auth/register",
        GET_USER_INFO: "/api/v1/auth/getUser",
        VERIFY_EMAIL: "/api/v1/auth/verify-email",
        RESEND_VERIFICATION: "/api/v1/auth/resend-verification",
    },
    DASHBOARD: {
        GET_DATA: "/api/v1/dashboard"
    },
    INCOME: {
        ADD_INCOME: "/api/v1/income/add",
        GET_ALL_INCOME: "/api/v1/income/get",
        DELETE_INCOME: (incomeId) => `/api/v1/income/${incomeId}`,
        DOWNLOAD_INCOME: "/api/v1/income/downloadexcel"
    },
    EXPENSE: {
        ADD_EXPENSE: "/api/v1/expense/add",
        GET_ALL_EXPENSE: "/api/v1/expense/get",
        DELETE_EXPENSE: (expenseId) => `/api/v1/expense/${expenseId}`,
        DOWNLOAD_EXPENSE: "/api/v1/expense/downloadexcel"
    },
    IMAGE:{
        UPLOAD_IMAGE: "/api/v1/auth/upload-image",
    },
    EXPENSO_AI: {
  CHAT: "/api/v1/expensoAI",
},

};
