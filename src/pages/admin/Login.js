import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((s) => s.auth);

  const schema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(4, 'Too short').required('Required'),
  });

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Admin Login</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={schema}
        onSubmit={async (values) => {
          try {
            await dispatch(login(values)).unwrap();
            toast.success('Welcome back!');
            navigate('/admin/dashboard');
          } catch (e) {
            toast.error(e.message || 'Login failed');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <Field name="email" type="email" placeholder="Email" className="border p-2 w-full" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <Field name="password" type="password" placeholder="Password" className="border p-2 w-full" />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>
            <button type="submit" disabled={isSubmitting || status === 'loading'}
              className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 w-full">
              {status === 'loading' ? 'Signing in...' : 'Login'}
            </button>
            {error && <div className="text-red-500 text-sm">{error}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
