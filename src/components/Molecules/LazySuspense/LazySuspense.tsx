import { FC, ReactNode, Suspense } from 'react';
import Spinner from '../../Atoms/Spinner';

interface LazySuspenseProps {
  children: ReactNode;
}

const LazySuspense: FC<LazySuspenseProps> = ({ children }) => {
  return (
    <Suspense fallback={<Spinner BoxProps={{ sx: { mt: 3 } }} />}>
      {children}
    </Suspense>
  );
};

export default LazySuspense;
