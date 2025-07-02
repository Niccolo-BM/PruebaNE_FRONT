import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getNotes, createNoteApi, deleteNoteApi, getNoteStats } from '../api';

export const useNotes = () => {
  return useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createNoteApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
  });
};

export const useDeleteNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteNoteApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
  });
};

export const useNoteStats = () => {
  return useQuery({
    queryKey: ['stats'],
    queryFn: getNoteStats,
    staleTime: 1000 * 60 * 5,
  });
};
