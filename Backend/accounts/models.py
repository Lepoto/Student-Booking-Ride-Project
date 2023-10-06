from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager, PermissionsMixin

class UserAccountManager(BaseUserManager):
    def create_user(self, email, name, surname, username, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        if not name:
            raise ValueError('Users must have a name')
        if not surname:
            raise ValueError('Users must have a surname')
        if not username:
            raise ValueError('Users must have a username')

        user = self.model(
            email=self.normalize_email(email),
            name=name,
            surname=surname,
            username=username
        )

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_student(self, email, name, surname, username, password):
        user = self.create_user(
            email=self.normalize_email(email),
            name=name,
            surname=surname,
            username=username,
            password=password
        )
        user.is_staff = True
        user.is_active = True
        user.is_student = True
        user.save(using=self._db)

        return user

    def create_driver(self, email, name, surname, username, password):
        user = self.create_user(
            email=self.normalize_email(email),
            name=name,
            surname=surname,
            username=username,
            password=password
        )
        user.is_staff = True
        user.is_active = True
        user.is_driver = True
        user.save(using=self._db)

        return user

    def create_manager(self, email, name, surname, username, password):
        user = self.create_user(
            email=self.normalize_email(email),
            name=name,
            surname=surname,
            username=username,
            password=password
        )
        user.is_staff = True
        user.is_active = True
        user.is_admin = True
        user.is_superuser = True
        user.is_manager = True
        user.save(using=self._db)

        return user

class UserAccount(AbstractUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    surname = models.CharField(max_length=255)
    username = models.CharField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_student = models.BooleanField(default=False)
    is_driver = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False, null=True)
    is_superuser = models.BooleanField(default=False, null=True)
    otp_secret_key = models.CharField(max_length=16, blank=True, null=True)

    groups = models.ManyToManyField(
        'auth.Group',
        blank=True,
        related_name='custom_user_set',  # Add a unique related_name
        verbose_name='groups',
        help_text='The groups this user belongs to.',
    )

    user_permissions = models.ManyToManyField(
        'auth.Permission',
        blank=True,
        related_name='custom_user_set',  # Add a unique related_name
        verbose_name='user permissions',
        help_text='Specific permissions for this user.',
    )

    objects = UserAccountManager()

    USERNAME_FIELD = 'username'
    def get_full_name(self):
        return self.name + " " + self.surname

    def get_short_name(self):
        return self.name

    def __str__(self):
        return self.email

class RegisteredStudent(models.Model):
    name = models.CharField(max_length=255)
    surname = models.CharField(max_length=255)
    student_number = models.CharField(max_length=7, unique=True)

    def __str__(self):
        return self.name + " " + self.surname + " " + self.student_number

