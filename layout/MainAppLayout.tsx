import styled from 'styled-components';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react'
import useUser from '../hooks/useUser';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  flex:1 0;
`;

const AppBar = styled.header`
  display: flex;
  padding: 24px;
  height: 60px;
  align-items: center;
  justify-content: space-between;
  background-color: #3d3d3d;
  > div:first-child{
    display: flex;
    align-items: center;
    gap: 8px;
  }
  > div:last-child{

  }
`;

const Drawer = styled.aside`
  display: flex;
  flex-direction: column;
  gap:8px;
  padding: 8px;
  background-color: #2c2c2c;
  width: 240px;
`;

const Main = styled.main` 
  width: 100%;
  padding: 24px;
`;

const Button = styled.button`
  padding: 12px;
  background-color: #007dc5;
  color: #FFFFFF;
  border-radius: 4px;
  border:none;
  cursor: pointer;
  transition: 0.3s;
  &:hover{
    opacity: 0.8;
  }
  &:active{
    transition: none;
    opacity: 0.7;
  }
`;

const Avatar = styled.img`
    border-radius: 50%;
    width: 36px;
    height: 36ppx;
`;

const UserName = styled.h4`
  font-size: 20px;
  font-family: monospace;
`;

const DrawerNavList = styled.ul`
  list-style-type: none;
  margin: 0px;
  padding: 0px;
  display: flex;
  gap: 8px;
  flex-direction: column;
`

const DrawerNavListItem = styled.li`
  text-decoration: none;
  border-radius: 4px;
  padding: 12px;
  transition: 0.3s;
  cursor: pointer;
  &:hover{
    background-color: #424242;
  }
  &:active{
    transition: 0s;
    background-color: #525252;
  }
`

const DrawerNavListItemActive = styled.li`
  text-decoration: none;
  border-radius: 4px;
  padding: 12px;
  transition: 0.3s;
  cursor: pointer;
  background-color: #424242;
`

export default function MainAppLayout({ children }: { children: ReactNode }) {

  const { user, clearUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push(process.env.NEXT_PUBLIC_LOGIN_PAGE_URL as string)
  }, [])

  if (!user) return <></>

  return (
    <Container>
      <AppBar>
        <div>
          <Avatar src={user?.picture} />
          <UserName>{user.name}</UserName>
        </div>
        <div>
          <Button onClick={async () => {
            await router.push("/login");
            clearUser();
          }} >LOGOUT</Button>
        </div>
      </AppBar>
      <Content>
        <Drawer>
          <DrawerNavList>
            {['Dashboard', 'Report', 'Sales'].map((e) =>
              <DrawerNavListItem key={`nav-drawer-item-${e}`}>{e}</DrawerNavListItem>
            )}
            <DrawerNavList>
              <DrawerNavListItemActive key={`nav-drawer-item-profile`}  >Profile</DrawerNavListItemActive>
            </DrawerNavList>
          </DrawerNavList>
        </Drawer>
        <Main>{children}</Main>
      </Content>
    </Container>
  );
};