import { NextApiRequest, NextApiResponse } from "next"
import prisma from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
const serverAuth = async (req: NextApiRequest,res:NextApiResponse) => {
  // console.log("@@@@req@@@@",req);
  const session = await getServerSession(req, res, authOptions)

  // console.log("::::::@@@",session?.user);
  if(!session?.user?.email){
    throw new Error("Not signed in")
  }
  
  const currentUser = await prisma.user.findUnique({
    where:{
      email: session.user.email
    }
  })
  
  if(!currentUser){
    throw new Error("Not signed in")
  }

  return {currentUser}

}

export default serverAuth;