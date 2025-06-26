import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Hero from './_components/hero'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon } from 'lucide-react'
import { getCurrentUser } from '@/lib/user'
import { notFound } from 'next/navigation'

const Page = async () => {
  const user = await getCurrentUser()
  if (!user) return notFound()

  return (
    <div>
      {/* header */}
      <header className='bg-background/70 sticky top-0 z-10 flex items-center gap-6 border-b px-3 py-2 backdrop-blur-3xl'>
        <Button
          variant='ghost'
          size='icon'
          aria-label='Back'
        >
          <ArrowLeftIcon />
        </Button>

        <div className='flex flex-col items-start justify-center'>
          <span className='text-lg leading-none font-bold'>{user.name}</span>
          <span className='text-foreground/60 text-sm'>{user.postsCount} posts</span>
        </div>
      </header>

      {/* hero */}
      <Hero user={user} />

      {/* tabs */}
      <Tabs defaultValue='Tweets'>
        <TabsList>
          <TabsTrigger value='Tweets'>Tweets</TabsTrigger>
          <TabsTrigger value='Replies'>Replies</TabsTrigger>
          <TabsTrigger value='Media'>Media</TabsTrigger>
          <TabsTrigger value='Likes'>Likes</TabsTrigger>
        </TabsList>
        <TabsContent value='Tweets'>Here are the tweets</TabsContent>
        <TabsContent value='Replies'>Here are the replies</TabsContent>
        <TabsContent value='Media'>Here are the media</TabsContent>
        <TabsContent value='Likes'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum, amet inventore corrupti doloribus quaerat
          odio eius minus. Non enim nulla neque quis vitae dolorem architecto exercitationem tempora praesentium aperiam
          vel, magnam quibusdam libero animi, esse modi tempore, totam distinctio. Minus non totam ratione? Illum
          consequuntur esse deleniti amet quisquam, accusamus rerum minus optio nemo, ipsa, totam corrupti voluptatibus!
          Reiciendis, non enim ex nulla recusandae nobis porro voluptas dolores officiis esse nisi atque rem deserunt
          adipisci alias fugiat. Ipsa sequi culpa obcaecati molestiae commodi repellendus rerum, ipsam fugit repellat
          minima veniam tempore ea dolore! Alias ut nulla atque accusamus culpa hic laudantium, sit, voluptate est et
          placeat quia beatae veniam minus. Voluptate necessitatibus sit possimus aliquam quibusdam molestiae saepe
          adipisci odio eveniet obcaecati nobis, at eos. Expedita rem ab commodi quasi maxime, veniam modi. Dicta
          reiciendis optio hic quas dolores eligendi earum debitis animi minima dolor, quo voluptates, eveniet modi vel
          delectus molestiae eius. Itaque suscipit sed blanditiis quaerat, repellat culpa distinctio quidem, possimus
          saepe ipsam placeat. Excepturi modi repellendus in sapiente quibusdam nihil, cumque rem exercitationem,
          laudantium sint optio magni. Fugit reiciendis modi recusandae cupiditate consequatur ducimus rem labore et
          asperiores soluta numquam natus blanditiis optio consectetur ratione in atque accusamus, architecto quos
          perspiciatis consequuntur placeat autem id! Voluptatum provident quibusdam nisi, maiores praesentium quasi
          commodi veniam accusamus, eius alias perspiciatis dolorum veritatis facilis voluptas accusantium saepe? Nulla
          aliquam ab ex voluptatum odit doloribus architecto cupiditate earum unde. Eligendi veniam exercitationem
          minima! Voluptatem praesentium officiis voluptates? Dolorem maxime, unde ducimus odit quidem id nihil quas
          possimus voluptas sit in recusandae ea, impedit eum? Quaerat rerum odio deserunt ex nihil temporibus quia vel
          dolore in quidem natus cupiditate labore obcaecati accusamus sunt accusantium, dolores fuga voluptate
          doloremque aut aliquam expedita? Unde architecto veritatis tenetur officia deserunt velit similique expedita
          perspiciatis consequatur.
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Page
