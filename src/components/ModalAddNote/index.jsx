import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import { useCreateNote } from '../../hooks/useNotes';
import './index.css';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import RoomIcon from '@mui/icons-material/Room';
import InputAdornment from '@mui/material/InputAdornment';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import BuildIcon from '@mui/icons-material/Build';
import { useTranslation } from 'react-i18next';


const ModalAddNote = ({ onClose }) => {
    const { t } = useTranslation();
    const { mutate: createNote, isLoading: isCreating } = useCreateNote();
    const initialValues = {
        recordType: '',
        title: '',
        route: '',
        amount: '',
        description: ''
    };
    const validationLogic = Yup.object({
        recordType: Yup.string().required('Required'),
        title: Yup.string().required('Required'),
        route: Yup.string().required('Required'),
        amount: Yup.number()
          .typeError('Must be a number')
          .positive('Must be positive')
          .when('recordType', {
            is: 'recaudo',
            then: schema => schema.required('Required'),
            otherwise: schema => schema.notRequired(),
          }),
        description: Yup.string().required('Required'),
    });
    return (

        <div>
            <div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationLogic}
                    onSubmit={(values, { resetForm }) => {
                        const payload = {
                          type: values.recordType,
                          title: values.title,
                          route: values.route,
                          amount: values.recordType === 'recaudo' ? values.amount : undefined,
                          content: values.description,
                        };
                        createNote(payload, {
                          onSuccess: () => {
                            resetForm();
                            onClose();
                          }
                        });
                    }}>
                    {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
                        <Form>
                          <Box>
                            <h2 className="text-xl font-semibold mb-4">
                              {t('modal.title')}
                            </h2>
                            <FormControl fullWidth margin="normal">
                              <InputLabel id="record-type-label">{t('modal.typeLabel')}</InputLabel>
                              <Select
                                labelId="record-type-label"
                                id="recordType"
                                name="recordType"
                                value={values.recordType}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.recordType && Boolean(errors.recordType)}
                                label="Tipo de Registro"
                              >
                                <MenuItem value="">
                                  <em>{t('modal.selectPlaceholder')}</em>
                                </MenuItem>
                                <MenuItem value="recaudo">
                                  <AttachMoneyIcon fontSize="small" sx={{ mr: 1 }} /> {t('modal.option.collection')}
                                </MenuItem>
                                <MenuItem value="incidencia">
                                  <WarningAmberIcon fontSize="small" sx={{ mr: 1 }} /> {t('modal.option.incident')}
                                </MenuItem>
                                <MenuItem value="mantenimiento">
                                  <BuildIcon fontSize="small" sx={{ mr: 1 }} /> {t('modal.option.maintenance')}
                                </MenuItem>
                              </Select>
                            </FormControl>
                            <TextField
                              fullWidth
                              margin="normal"
                              id="title"
                              name="title"
                              label={t('modal.titleLabel')}
                              placeholder={t('modal.titlePlaceholder')}
                              value={values.title}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.title && Boolean(errors.title)}
                              helperText={touched.title && errors.title}
                            />
                            <TextField
                              fullWidth
                              margin="normal"
                              id="route"
                              name="route"
                              label={t('modal.routeLabel')}
                              placeholder={t('modal.routePlaceholder')}
                              value={values.route}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.route && Boolean(errors.route)}
                              helperText={touched.route && errors.route}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <RoomIcon />
                                  </InputAdornment>
                                ),
                              }}
                            />
                            {values.recordType === 'recaudo' && (
                              <TextField
                                fullWidth
                                margin="normal"
                                id="amount"
                                name="amount"
                                label={t('modal.amountLabel')}
                                placeholder={t('modal.amountPlaceholder')}
                                value={values.amount}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.amount && Boolean(errors.amount)}
                                helperText={touched.amount && errors.amount}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <AttachMoneyIcon />
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            )}
                            <TextField
                              fullWidth
                              margin="normal"
                              id="description"
                              name="description"
                              label={t('modal.descriptionLabel')}
                              placeholder={t('modal.descriptionPlaceholder')}
                              multiline
                              minRows={3}
                              value={values.description}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.description && Boolean(errors.description)}
                              helperText={touched.description && errors.description}
                            />
                              <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
                              <Button variant="contained" color="primary" type="submit" disabled={isSubmitting || isCreating}>
                                {isCreating ? t('modal.submit') : t('modal.submit')}
                              </Button>
                              <Button variant="outlined" onClick={onClose}>
                                {t('modal.cancel')}
                              </Button>
                            </Box>
                          </Box>
                        </Form>)}
                </Formik>
            </div>
        </div>
    );
};

export default ModalAddNote;