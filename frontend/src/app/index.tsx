import LoginForm from "../components/LoginForm";
import Profile from "../components/Profile";
import RegisterForm from "../components/RegisterForm";
import TodoList from "../components/TodoList";
import Divider from "../components/ui/Divider";
import Spinner from "../components/ui/Spinner";
import { useAuth } from "../contexts/AuthProvider/hooks";

const App = () => {
  const { user, isUserLoading } = useAuth();
  return (
    <div className="flex h-screen w-screen flex-col items-center overflow-auto text-slate-600">
      <div className="flex h-full w-full max-w-[1024px] flex-col bg-slate-50">
        <Profile />
        {!isUserLoading ? (
          <>
            {!user ? (
              <div className="flex h-full w-full flex-col md:flex-row">
                <LoginForm />
                <div className="px-4 py-0 md:px-0 md:py-4">
                  <Divider align="vertical" className="bg-slate-200 max-md:hidden" />
                  <Divider align="horizontal" className="bg-slate-200 md:hidden" />
                </div>
                <RegisterForm />
              </div>
            ) : null}
            {user ? <TodoList /> : null}
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default App;
