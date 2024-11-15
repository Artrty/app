import { ApiStatusHandler } from '@/lib/apiStatusHandler';
import { AxiosResponse } from 'axios';
import axios from '@/lib/axios';

interface PEvent {
  eventTitle: string;
  eventLocation: string;
  eventDate: string;
  eventDescription: string;
  precautions: string;
  eventInfoLink: string;
  image: object;
}

export interface ResEvent {
  eventTitle: string;
  eventLocation: string;
  eventDate: string;
  eventDescription: string;
  precautions: string;
  eventInfoLink: string;
  postWriter: string;
  eventPosterUrl: string;
  postTime: string;
  eventAddress: string;
  id: string;
}

interface ResCreateEvent {
  savedEventBoardId: number;
}

function createEvent(event: PEvent): Promise<AxiosResponse<ResCreateEvent>> {
  const form = new FormData();
  Object.keys(event).forEach((key) => form.append(key, event[key]));
  console.log('formData', form);
  return axios.post('/event-board/create', form, {
    headers: { 'content-type': 'multipart/form-data' },
  });
}

interface ResGetAll {
  data: {
    eventBoard: ResEvent[];
  };
  message: string;
  code: string;
}

function getAll(): Promise<AxiosResponse<ResGetAll>> {
  return axios.get('/event-board/viewAll');
}

interface ResGetEvent {
  eventBoard: ResEvent;
}

function getEvent(id: string): Promise<AxiosResponse<ResGetEvent>> {
  return axios.get(`/event-board/${id}`);
}

export default {
  createEvent: ApiStatusHandler<ResCreateEvent>(createEvent),
  getAll: ApiStatusHandler<ResGetAll>(getAll),
  getEvent: ApiStatusHandler<ResGetEvent>(getEvent),
};
