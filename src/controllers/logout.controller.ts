export const logoutUser = (req: any, res: any) => {
    const { token } = req.body;
    console.log('logout')
   res.json({ success: true });

  }