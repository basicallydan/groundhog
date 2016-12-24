import { AsyncStorage } from 'react-native';

export async function getActivities() {
  return AsyncStorage.getItem('@groundhog:activities')
    .then(activities => (JSON.parse(activities) || [])
        .map(({ id, title, lastAction, frequencyHours }) => {
          const activity = {
            id,
            title,
            lastAction: new Date(lastAction),
            frequencyHours,
          };
          return activity;
        })
    );
}

export async function saveActivities(activities) {
  return AsyncStorage.setItem('@groundhog:activities', JSON.stringify(activities));
}
