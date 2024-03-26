import useSWR from 'swr';
import { lessonsService } from '../../services/api/lessonsApi';
import { ILessonRes } from '../../types/lessonsType';
import { IResData } from '../../types/common';


const useLessonProvider = () => {
  const { data, error, isLoading } = useSWR<IResData<ILessonRes[]>>('/api/v1/lessons', async()=>{
    const response = await lessonsService.getAll();
    return response.data as any; 
  }, {
  });

  return {
    data, error, isLoading
  }
}

export default useLessonProvider;