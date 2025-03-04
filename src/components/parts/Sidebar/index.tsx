'use client'

import { Box, Text, Link, VStack, Collapsible } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'

type LinkItem = {
  label: string
  href: string
}

type SubItem ={
  label: string
  links: LinkItem[]
}

type MenuItem = {
  label: string
  links?: LinkItem[]
  subItems?: SubItem[]
}

const menuItems: MenuItem[] = [
  {
    label: '通常機能',
    subItems: [
      {
        label: '魚カテゴリ',
        links: [
          { label: '魚カテゴリ一覧', href: '/fish-categories' },
          { label: '魚カテゴリ登録', href: '/fish-categories/create' },
        ],
      },
      {
        label: '魚',
        links: [
          { label: '魚一覧', href: '/fishes' },
          { label: '魚登録', href: '/fishes/create' },
        ],
      },
      {
        label: 'エリア',
        links: [
          { label: 'エリア一覧', href: '/areas' },
          { label: 'エリア登録', href: '/areas/create' },
        ],
      },
      {
        label: '釣り場(作成中)',
        links: [
          { label: '釣り場一覧', href: '#fishing-spot-list' },
          { label: '釣り場登録', href: '#fishing-spot-create' },
        ],
      },
      {
        label: '道具(作成中)',
        links: [
          { label: '道具一覧', href: '#tools-list' },
          { label: '道具登録', href: '#tools-create' },
        ],
      },
      {
        label: 'イベント(作成中)',
        links: [
          { label: 'イベント一覧', href: '#event-list' },
          { label: 'イベント登録', href: '#event-create' },
        ],
      },
      {
        label: '記事(作成中)',
        links: [
          { label: '記事一覧', href: '#article-list' },
          { label: '記事登録', href: '#article-create' },
        ],
      },
    ],
  },
  {
    label: '画像機能',
    links: [
      { label: '一覧', href: '/images' },
      { label: '登録', href: '/images/add' },
    ],
  },
]

const Side = () => {
  const pathname = usePathname()

  const isMenuOpen = (links) => links.some((link) => pathname.startsWith(link.href))
  const isParentMenuOpen = (menu) => {
    return (
      (menu.links && isMenuOpen(menu.links)) ||
      (menu.subItems && menu.subItems.some((sub) => isMenuOpen(sub.links)))
    )
  }

  return (
    <Box>
      <Box
        w='240px'
        bg='gray.800'
        color='white'
        p={4}
        display='flex'
        flexDirection='column'
      >
        <Text fontSize='2xl' fontWeight='bold' mb={6}>
          <Link href='/dashboard' _hover={{ color: 'teal.300' }}>
            管理画面
          </Link>
        </Text>

        <VStack align='stretch'>
          {menuItems.map((menu, menuIndex) => (
            <Collapsible.Root key={`${menu.label}-${menuIndex}`} defaultOpen={isParentMenuOpen(menu)}>

              <Collapsible.Trigger
                paddingY='3'
              >
                {menu.label}
              </Collapsible.Trigger>

              <Collapsible.Content>
                {menu.subItems ? (
                  menu.subItems.map((sub, subIndex) => (
                    <Collapsible.Root key={`${sub.label}-${subIndex}`} defaultOpen={isMenuOpen(sub.links)}>
                      <Box padding='4'>
                        <Collapsible.Trigger
                          paddingY='3'
                        >
                          {sub.label}
                        </Collapsible.Trigger>
                        <Collapsible.Content>
                          {sub.links.map((link, linkIndex) => (
                            <Box
                              key={`${link.href}-${linkIndex}`}
                              padding='4'
                              bg={pathname === link.href ? 'teal.800' : 'transparent'}
                            >
                              <Link href={link.href} _hover={{ color: 'teal.300' }}>
                                {link.label}
                              </Link>
                            </Box>
                          ))}
                        </Collapsible.Content>
                      </Box>
                    </Collapsible.Root>
                  ))
                ) : (
                  menu.links.map((link, linkIndex) => (
                    <Box
                      key={`${link.href}-${linkIndex}`}
                      padding='4'
                      bg={pathname === link.href ? 'teal.800' : 'transparent'}
                      color={pathname === link.href ? 'white' : 'inherit'}
                    >
                      <Link href={link.href} _hover={{ color: 'teal.300' }}>
                        {link.label}
                      </Link>
                    </Box>
                  ))
                )}
              </Collapsible.Content>

            </Collapsible.Root>
          ))}
        </VStack>

        <Text fontSize='sm' color='gray.400'>
          © 2024 管理画面
        </Text>
      </Box>
    </Box>
  )
}

export default Side
