import {Observable} from "rxjs";

export function createHttpObservable(url: string){
  const controller = new AbortController();
  const signal = controller.signal;
  return Observable.create(observer => {
    fetch(url,{signal})
      .then(response => {
        return response.json();
      })
      .then(body => {
        observer.next(body);
        observer.complete();
      })
      .catch(error => {
        observer.error(error);
      });

    return () => controller.abort();
  });
}

