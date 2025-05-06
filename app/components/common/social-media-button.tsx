export default function SocialMediaButton({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <button className='p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]'>
      {children}
    </button>
  )
}
