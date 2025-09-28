import { Toaster } from 'react-hot-toast';

const ToastPortal = () => (
  <Toaster
    toastOptions={{
      success: { style: { background: '#10b981', color: 'white' } },
      error: { style: { background: '#ef4444', color: 'white' } },
    }}
    position="top-right"
  />
);

export default ToastPortal;
