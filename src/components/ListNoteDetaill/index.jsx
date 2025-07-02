import React, { useState } from 'react';
import './index.css';
import { useNotes, useDeleteNote } from '../../hooks/useNotes';
import ItemNoteDetail from '../ItemNoteDetail';
import { Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress } from '@mui/material';
import { FixedSizeList } from 'react-window';
import { useTranslation } from 'react-i18next';

const ListNoteDetail = () => {
    const { data: notes = [], isLoading, isError, error } = useNotes();
    const { mutate: deleteNote, isLoading: isDeleting } = useDeleteNote();
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const { t } = useTranslation();

    const handleConfirmDelete = () => {
        deleteNote(selectedId, {
          onSuccess: () => {
            setOpen(false);
            setSelectedId(null);
          }
        });
    };
    const handleCancel = () => {
        setOpen(false);
        setSelectedId(null);
    };

    return (
        <div className="w-full">
            <div className="bg-white rounded-xl shadow-lg p-4 min-h-[180px] flex flex-col gap-4">
                    {isLoading ? (
                      <Box className="flex justify-center py-8"><CircularProgress /></Box>
                    ) : isError ? (
                      <Box className="flex justify-center py-8"><Typography color="error">Error: {error.message}</Typography></Box>
                    ) : (
                    <>                      
                    <div className="flex mb-2 justify-between items-center">
                        <Typography variant="h5">{t('list.notesTitle')}</Typography>
                        <Typography variant="body2">
                          {t('list.total')}: {notes.length}
                        </Typography>
                    </div>
                    {notes.length === 0 ? (
                        <div className="flex flex-col items-center justify-center bg-gray-100 rounded-md shadow-inner py-8 mt-4">
                            <span className="text-gray-500 text-lg font-medium">
                              {t('list.noNotes')}
                            </span>
                        </div>
                    ) : (
                        <FixedSizeList
                          height={350}
                          itemCount={notes.length}
                          itemSize={140}
                          width="100%"
                        >
                          {({ index, style }) => {
                            const note = notes[index];
                            return (
                              <Box
                                key={note.id}
                                style={{ ...style, padding: '8px 0' }}
                              >
                                <ItemNoteDetail
                                  note={note}
                                  onDelete={id => { setSelectedId(id); setOpen(true); }}
                                />
                              </Box>
                            );
                          }}
                        </FixedSizeList>
                    )}
                    </>
                    )}
            </div>
            <Dialog open={open} onClose={handleCancel}>
                <DialogTitle>{t('list.confirmDeleteTitle')}</DialogTitle>
                <DialogContent>
                    <Typography>{t('list.confirmDeleteContent')}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary" disabled={isDeleting}>
                      {t('list.cancel')}
                    </Button>
                    <Button onClick={handleConfirmDelete} color="error" disabled={isDeleting}>
                      {isDeleting ? t('list.delete') : t('list.delete')}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ListNoteDetail;

