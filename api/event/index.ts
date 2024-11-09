import { ApiStatusHandler } from '@/lib/apiStatusHandler';
import { AxiosResponse } from 'axios';
import axios from '@/lib/axios';

interface PCreateEvent {
  eventTitle: string;
  eventLocation: string;
  eventDate: string;
  eventDescription: string;
  precautions: string;
  eventInfoLink: string;
  image: object;
}

interface ResCreateEvent {
  data: {
    savedEventBoardId: number;
  };
  message: string;
  code: string;
}
function createEvent(
  event: PCreateEvent
): Promise<AxiosResponse<ResCreateEvent>> {
  const form = new FormData();
  Object.keys(event).forEach((key) => form.append(key, event[key]));
  console.log('formData', form);
  return axios.post('/event-board/create', form, {
    headers: { 'content-type': 'multipart/form-data' },
  });
}

export default {
  createEvent: ApiStatusHandler<ResCreateEvent>(createEvent),
};
