export default async function updateCoupon(
    token: string,
    coupon_Type: string,
    body: any
  ) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/coupons/type/${coupon_Type}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
  
      if (!response.ok) {
       
        throw new Error("Failed to update coupons");
      }
  
      return await response.json();
    } catch (error: any) {
      throw new Error(`Failed to update coupons: ${error.message}`);
    }
  }
  