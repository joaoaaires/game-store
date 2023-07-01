export default function Home() {
  const isAuth = false

  if (!isAuth) {
    return <div className=" text-xl font-bold ">Hello Word!</div>
  }

  return <div className=" text-xl font-bold ">Hello Word Auth!</div>
}
