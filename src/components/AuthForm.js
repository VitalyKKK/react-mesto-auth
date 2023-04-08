function AuthForm({ title, children, onSubmit }) {
  return (
    <section className="authform">
      <h1 className="authform__title">{title}</h1>
      <form className="authform__form" onSubmit={onSubmit}>
        {children}
      </form>
    </section>
  );
}

export default AuthForm;