import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stethoscope, ShieldCheck, UserPlus } from 'lucide-react';
import Button from '../../components/common/Button';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['Doctor', 'Patient'])
});

type FormValues = z.infer<typeof schema>;

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setError(null);
      setIsLoading(true);

      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to register');
      }

      // Store token and user data
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify({
        id: result._id,
        name: result.name,
        username: result.email,
        role: result.role
      }));

      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to register');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Stethoscope size={48} className="text-primary-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-neutral-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-neutral-600">
          Or{' '}
          <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
            sign in to your existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-neutral-200">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                className={`form-input ${errors.name ? 'border-error-300 focus:ring-error-500' : ''}`}
                {...register('name')}
              />
              {errors.name && (
                <p className="form-error">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                className={`form-input ${errors.email ? 'border-error-300 focus:ring-error-500' : ''}`}
                {...register('email')}
              />
              {errors.email && (
                <p className="form-error">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                className={`form-input ${errors.password ? 'border-error-300 focus:ring-error-500' : ''}`}
                {...register('password')}
              />
              {errors.password && (
                <p className="form-error">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="form-label">Account Type</label>
              <div className="mt-2 grid grid-cols-2 gap-4">
                <label className="relative flex cursor-pointer rounded-lg border bg-white p-4 focus:outline-none">
                  <input
                    type="radio"
                    value="Patient"
                    className="sr-only"
                    {...register('role')}
                  />
                  <span className="flex flex-1">
                    <span className="flex flex-col">
                      <span className="block text-sm font-medium text-neutral-900">Patient</span>
                      <span className="mt-1 flex items-center text-sm text-neutral-500">
                        Access your medical records and appointments
                      </span>
                    </span>
                  </span>
                  <span className="pointer-events-none absolute -inset-px rounded-lg border-2" aria-hidden="true"></span>
                </label>

                <label className="relative flex cursor-pointer rounded-lg border bg-white p-4 focus:outline-none">
                  <input
                    type="radio"
                    value="Doctor"
                    className="sr-only"
                    {...register('role')}
                  />
                  <span className="flex flex-1">
                    <span className="flex flex-col">
                      <span className="block text-sm font-medium text-neutral-900">Doctor</span>
                      <span className="mt-1 flex items-center text-sm text-neutral-500">
                        Manage patients and medical records
                      </span>
                    </span>
                  </span>
                  <span className="pointer-events-none absolute -inset-px rounded-lg border-2" aria-hidden="true"></span>
                </label>
              </div>
              {errors.role && (
                <p className="form-error">{errors.role.message}</p>
              )}
            </div>

            {error && (
              <div className="bg-error-50 border border-error-200 rounded-md p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <ShieldCheck className="h-5 w-5 text-error-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-error-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                isLoading={isLoading}
                icon={<UserPlus size={16} />}
              >
                Create Account
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;