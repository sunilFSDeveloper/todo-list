import { Alert, Snackbar, Stack } from '@mui/material'
import React from 'react'

interface SnackbarComponentProps {
  errorText?: string
  setError: (error: string | null) => void
}

const SnackbarComponent = ({ errorText, setError }: SnackbarComponentProps) => {
  const handleCloseError = () => {
    setError(null)
  }

  return (
    <Snackbar
      open={Boolean(errorText)}
      autoHideDuration={6000}
      onClose={handleCloseError}
    >
      <Alert severity="error" onClose={handleCloseError}>
        {errorText}
      </Alert>
    </Snackbar>
  )
}

export default SnackbarComponent