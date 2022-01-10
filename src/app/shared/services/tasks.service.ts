import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRoutes } from '../api/routes';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(private http: HttpClient) {}

  addTask(data: any) {
    return this.http.post(ApiRoutes.tasks.add, data)
  }

  getAll(dTParams: any) {
    return this.http.post<any>(ApiRoutes.tasks.all, dTParams)
  }

  getTasksById(id: number) {
    return this.http.get<any>(ApiRoutes.tasks.byId, {
      params: {
        id
      }
    })
  }

  updateTaskById(taskId: number, data: any) {
    return this.http.post(ApiRoutes.tasks.update, {...data, taskId})
  }

  deleteTask(id: number) {
    return this.http.delete(ApiRoutes.tasks.delete, {
      params: {
        id
      }
    })
  }

  getTaskStatusById(taskId: number) {
    return this.http.post(ApiRoutes.tasks.byStatus, {}, {
      params: {
        taskId
      }
    })
  }

  updateTaskStatusById(taskId: number, newStatus: any) {
    return this.http.get(ApiRoutes.tasks.updateStatus, {
      params: {
        taskId,
        newStatus
      }
    })
  }
}
