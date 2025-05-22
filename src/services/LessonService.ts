// LessonService.ts
import apiClient from "@/apiClient.ts";
import type {
    ApiError,
    CreateLessonRequest,
    DeleteLessonRequest, DeleteLessonResponse, LessonDAO,
    ListLessonsResponse,
    VideoUploadResponse
} from "@/models/Lesson.ts";


class LessonService {
    async createLesson(request: CreateLessonRequest): Promise<VideoUploadResponse> {
        try {
            const formData = new FormData();
            formData.append('file', request.file);
            formData.append('title', request.title);
            formData.append('description', request.description);

            const response = await apiClient.post<VideoUploadResponse>(
                '/lessons/create',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    timeout: 60000
                }
            );
            return response.data;
        } catch (error: any) {
            const apiError: ApiError = {
                success: false,
                message: error.response?.data?.message || 'Failed to upload lesson',
                errors: error.response?.data?.errors
            };
            throw apiError;
        }
    }
    async listLessons(): Promise<LessonDAO> {
        try {
            const response = await apiClient.post<LessonDAO>('/lessons/list');
            console.log(response.data, "in service lesson");
            return response.data;
        } catch (error: any) {
            const apiError: ApiError = {
                success: false,
                message: error.response?.data?.message || 'Failed to fetch lessons'
            };
            throw apiError;
        }
    }
    async getLessonById(lessonID: number): Promise<LessonDAO> {
        try {
            const response = await apiClient.post<LessonDAO>(`/lessons/find/${lessonID}`);
            return response.data;
        } catch (error: any) {
            const apiError: ApiError = {
                success: false,
                message: error.response?.data?.message || 'Failed to fetch lesson'
            };
            throw apiError;
        }
    }
    async deleteLesson(lessonID: number): Promise<DeleteLessonResponse> {
        try {
            const response = await apiClient.post<DeleteLessonResponse>(
                '/lessons/delete',
                {lessonID}
            );

            console.log(response.data, "in service lesson");
            return response.data;
        } catch (error: any) {
            const apiError: ApiError = {
                success: false,
                message: error.response?.data?.message || 'Failed to delete lesson'
            };
            throw apiError;
        }
    }
    getVideoStreamUrl(filename: string): string {
        return `${apiClient.defaults.baseURL}/videos/stream/${encodeURIComponent(filename)}`;
    }
    async streamVideoAsBlob(filename: string): Promise<Blob> {
        const response = await apiClient.get(
            `/videos/stream/${encodeURIComponent(filename)}`,
            {
                responseType: 'blob',
                headers: {
                    'Accept': 'video/*'
                }
            }
        );
        return response.data;
    }
}
export default new LessonService();