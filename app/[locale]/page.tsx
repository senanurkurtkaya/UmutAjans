import HomePage from './(public)/page';
import PublicLayout from './(public)/layout';

export default function LocalePage(props: any) {
  return (
    <PublicLayout>
      <HomePage {...props} />
    </PublicLayout>
  );
}