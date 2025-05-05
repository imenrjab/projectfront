import { HttpInterceptorFn } from '@angular/common/http';


export const httpTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('accessToken');
  console.log(token)



  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log("remarque",authReq)
    return next(authReq);
  }


  return next(req);
};


