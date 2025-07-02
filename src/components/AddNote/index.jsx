import React from 'react';
import './index.css';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useTranslation } from 'react-i18next';

const AddNote = ({ onOpenModal }) => {
    const { t } = useTranslation();
    return (
        <div className="bg-white rounded-xl shadow-md p-6 h-full flex flex-col justify-between">
            <div>
                <div className="flex flex-row items-center gap-2 mb-2">
                    <AddCircleOutlineIcon className="text-blue-600" fontSize="large" />
                    <span className="text-2xl font-bold text-slate-800">{t('addNote.title')}</span>
                </div>
                <div className="text-center text-slate-600 mb-6">
                    {t('addNote.description')}
                </div>
            </div>
            <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition-colors mt-auto"
                onClick={onOpenModal}
            >
                {t('addNote.newButton')}
            </button>
        </div>
    );
};

export default AddNote;