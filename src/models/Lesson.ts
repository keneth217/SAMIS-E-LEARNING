export interface CreateLessonRequest {
    file: File;
    title: string;
    description: string;
}

export interface DeleteLessonRequest {
    lessonID: number;
}

export interface VideoUploadResponse {
    success: boolean;
    message: string;
    filename: string;
    uploadDir: string;
    lesson: LessonDAO;
}

export interface LessonDAO {
    lessonID: number;
    title: string;
    description: string;
    filename: string;
    destination: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface ListLessonsResponse {
    success: boolean;
    lessons: LessonDAO[];
}

export interface DeleteLessonResponse {


    lessonID: number;
    title: string,
    description: string,
    filename: string,
    destination: string,
    deleted: boolean,
    createdByName: string,
    createdOn: string


    success: boolean;
    message: string;
    lesson: LessonDAO | null;
}


export interface ApiError {
    success: boolean;
    message: string;
    errors?: Record<string, string[]>;
}